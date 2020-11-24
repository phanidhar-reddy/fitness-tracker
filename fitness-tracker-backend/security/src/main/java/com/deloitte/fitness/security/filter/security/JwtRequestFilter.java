package com.deloitte.fitness.security.filter.security;

import com.deloitte.fitness.security.bo.UserService;
import com.deloitte.fitness.security.entities.dto.UserDto;
import com.deloitte.fitness.security.utills.security.JwtUtills;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtRequestFilter extends OncePerRequestFilter {

    private final UserService userService;
    private final JwtUtills jwtUtills;

    @Value("${fitness.security.app.authHeader}")
    private  String authHeader;

    /**
     * Same contract as for {@code doFilter}, but guaranteed to be
     * just invoked once per request within a single request thread.
     * See {@link #shouldNotFilterAsyncDispatch()} for details.
     * <p>Provides HttpServletRequest and HttpServletResponse arguments instead of the
     * default ServletRequest and ServletResponse ones.
     *
     * @param request
     * @param response
     * @param filterChain
     */
    @SneakyThrows
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        Enumeration<String> e = request.getHeaderNames();
        while (e.hasMoreElements()) {
            String param = e.nextElement();
            log.info(param +" " +request.getHeader(param));
        }
        final String jwtAuthToken = request.getHeader(authHeader);
        String jwt = null;
        String username = null;
        if (null != jwtAuthToken && jwtAuthToken.startsWith("Bearer ")) {
            jwt = jwtAuthToken.substring(7);
            username = jwtUtills.getUsernameFromToken(jwt);
        }

        if (null != username && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDto userDto = userService.findByUserName(username);
            if (jwtUtills.validateToken(jwt, userDto)) {
                // Code that is also done internally
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDto, null, userDto.getAuthorities()
                );
                usernamePasswordAuthenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                // Code that is also done internally
            }
        }
        filterChain.doFilter(request, response);
    }
}
