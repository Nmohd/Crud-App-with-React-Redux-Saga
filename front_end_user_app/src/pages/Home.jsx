import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserStart, loadUsersStart } from "../redux/actions";
import {
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBSpinner,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { users, loading } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  // const [page, setPage] =useState(2)
  // const userDatas = users.usersData;
  // console.log(userDatas);

  useEffect(() => {
    dispatch(loadUsersStart());
  }, [dispatch]);

  if (loading) {
    return (
      <MDBSpinner
        style={{ marginTop: "100px", marginLeft: "900px" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserStart(id));
      dispatch(loadUsersStart());

      toast.success("User Deleted Successfully");
    }
  };
  return (
    <>
      <div className="container" style={{ marginTop: "150px" }}>
        <MDBContainer>
          <MDBRow className="d-flex  mt-5 mb-5">
            {users.usersData &&
              users.usersData.map((item) => (
                <MDBCol lg="4" key={item.id}>
                  <MDBCard>
                    <MDBCardImage position="top" alt="..." src={item.avatar} />
                    <MDBCardBody>
                      <MDBCardTitle>
                        {item.first_name} <br></br>
                        {item.last_name}
                      </MDBCardTitle>
                      <MDBCardText>Email:{item.email}</MDBCardText>
                    </MDBCardBody>
                    <MDBListGroup flush>
                      <MDBListGroupItem>Gender :{item.gender}</MDBListGroupItem>
                      <MDBListGroupItem>Domain :{item.domain}</MDBListGroupItem>
                      <MDBListGroupItem>
                        Availaibility:
                        {item.available ? "Available" : "Not available"}
                      </MDBListGroupItem>
                    </MDBListGroup>
                    <MDBCardBody>
                      {/* <MDBBtn href="#">Button</MDBBtn> */}
                      <MDBBtn
                        className="m-1"
                        tag="a"
                        color="none"
                        onClick={() => handleDelete(item.id)}
                      >
                        <MDBTooltip title="Delete" tag="a">
                          <MDBIcon
                            fas
                            icon="trash"
                            style={{ color: "#dd4b39" }}
                            size="lg"
                          />
                        </MDBTooltip>
                      </MDBBtn>
                      <Link to={`/editUser/${item.id}`}>
                        <MDBTooltip title="Edit" tag="none">
                          <MDBIcon
                            fas
                            icon="pen"
                            style={{ color: "#55acee", marginBottom: "10px" }}
                            size="lg"
                          />
                        </MDBTooltip>
                      </Link>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
};

export default Home;
