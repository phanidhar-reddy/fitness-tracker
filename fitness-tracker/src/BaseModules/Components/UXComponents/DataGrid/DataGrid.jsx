import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Edit, DeleteOutline } from "@material-ui/icons";
import React from "react";

export default class DataGrid extends React.Component {
  genrateRowDataFromProps = () => {
    return this.props.collection.map((row, index) => (
      <TableRow key={`${row[this.props.keyId]}`}>
        {this.props.keys.split(",").map((key) => (
          <TableCell
            align="center"
            key={`${key}_${row[this.props.keyId]}_${index}`}
          >
            {this.props.genrateCustomeCuntent(key, row)}
          </TableCell>
        ))}
        {this.props.editRow ? (
          <TableCell align="center" key={`${row[this.props.keyId]}_Edit`}>
            <Edit onClick={(event) => this.props.editRow(event, row)} />
          </TableCell>
        ) : (
          <div></div>
        )}
        {this.props.delete ? (
          <TableCell align="center" key={`${row[this.props.keyId]}_Delete`}>
            <DeleteOutline
              onClick={(event) =>
                this.props.delete(event, row[this.props.keyId])
              }
            />
          </TableCell>
        ) : (
          <div></div>
        )}
      </TableRow>
    ));
  };

  genrateHeadersFromProps = () => {
    return (
      <TableRow>
        {this.props.headers.split(",").map((header) => (
          <TableCell align="center" key={header}>
            {header}
          </TableCell>
        ))}
        {this.props.editRow ? (
          <TableCell align="center" key={"Edit"}>
            Edit
          </TableCell>
        ) : (
          <div></div>
        )}
        {this.props.delete ? (
          <TableCell align="center" key={"Delete"}>
            Delete
          </TableCell>
        ) : (
          <div></div>
        )}
      </TableRow>
    );
  };

  render() {
    return (
      <Container>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>{this.genrateHeadersFromProps()}</TableHead>
            <TableBody>{this.genrateRowDataFromProps()}</TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" p={2}>
          {this.props.genrateEditableData ? (
            this.props.genrateEditableData()
          ) : (
            <div></div>
          )}
        </Box>
      </Container>
    );
  }
}
