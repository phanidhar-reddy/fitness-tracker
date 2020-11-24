package com.deloitte.fitness.dite.interceptors.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@ControllerAdvice
@Slf4j
public class ResponseAuthHandler implements ResponseBodyAdvice {

    @Value("${fitness.security.app.authHeader}")
    private String authHeader;

    private WebClient client = WebClient.builder().baseUrl("http://localhost:9133/authorization").build();


    /**
     * Whether this component supports the given controller method return type
     * and the selected {@code HttpMessageConverter} type.
     *
     * @param returnType    the return type
     * @param converterType the selected converter type
     * @return {@code true} if {@link #beforeBodyWrite} should be invoked;
     * {@code false} otherwise
     */
    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        log.info("ResponseAuthHandler -- supports");
        log.info(returnType.toString());
        return !"error".equals(returnType.getMethod().getName());
    }

    /**
     * Invoked after an {@code HttpMessageConverter} is selected and just before
     * its write method is invoked.
     *
     * @param body                  the body to be written
     * @param returnType            the return type of the controller method
     * @param selectedContentType   the content type selected through content negotiation
     * @param selectedConverterType the converter type selected to write to the response
     * @param request               the current request
     * @param response              the current response
     * @return the body that was passed in or a modified (possibly new) instance
     */
    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType, Class selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        log.info(" ResponseAuthHandler -- beforeBodyWrite");
        if(HttpMethod.OPTIONS.equals(request.getMethod())){
            log.info(" ResponseAuthHandler -- beforeBodyWrite ignored because fo options call");
            return true;
        }
        String authToken = request.getHeaders().get(authHeader).isEmpty()
                ? ""
                : request.getHeaders().get(authHeader).get(0);
        String token = client.post()
                .uri("/refresh")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromObject(authToken.substring(7)))
                .header(authHeader,authToken)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve().bodyToMono(String.class).block();
        response.getHeaders().add(authHeader,token);
        return body;
    }
}
