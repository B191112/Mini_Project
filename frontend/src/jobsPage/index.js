import { Component } from "react";
import Header from "../header";
import JobDetailsItem from "../jobDetailsItem";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

const employmentTypesList = [
  {
    label: "Software",
    employmentTypeId: "SOFTWARE",
  },
  {
    label: "Frontend",
    employmentTypeId: "FRONTEND",
  },
  {
    label: "Backend",
    employmentTypeId: "BACKEND",
  },
  {
    label: "Data Scientist",
    employmentTypeId: "DATA SCIENTIST",
  },
];

const salaryRangesList = [
  {
    salaryRangeId: 5,
    label: "5 LPA and above",
  },
  {
    salaryRangeId: 8,
    label: "8 LPA and above",
  },
  {
    salaryRangeId: 10,
    label: "10 LPA and above",
  },
  {
    salaryRangeId: 15,
    label: "15 LPA and above",
  },
];

class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: "",
    typeOfEmployement: "",
    salaryRange: 0,
  };

  changeEmploymentType = async (event) => {
    this.setState({ typeOfEmployement: event.target.value });
  };

  changeSalaryRange = async (event) => {
    this.setState({ salaryRange: event.target.value });
  };

  getJobsList = async () => {
    const apiUrl = `http://localhost:3000/jobs-list`;
    const jwtToken = Cookies.get("jwt_token");
    console.log(jwtToken);
    const options = {
      method: "GET", // moved method outside headers
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      this.setState({ jobsList: fetchedData });
    }
  };

  changeSearchInput = async (event) => {
    this.setState({ searchInput: event.target.value });
  };

  componentDidMount() {
    this.getJobsList();
  }

  render() {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken === undefined) {
      return <Redirect to="/login" />;
    }

    const { jobsList, searchInput, salaryRange, typeOfEmployement } =
      this.state;
    console.log(salaryRange);
    let updatedJobsList = jobsList.filter(
      (item) =>
        item.job_role.toLowerCase().includes(typeOfEmployement.toLowerCase()) &&
        item.package >= salaryRange &&
        item.job_role.toLowerCase().includes(searchInput.toLowerCase())
    );
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="combined-container">
          <div className="left-container">
            <div className="profile-container">
              <h2 className="user-profile-heading">Nithin Ambati</h2>
              <p className="user-profile-para">
                Lead Software Developer at AI/ML and web
              </p>
            </div>
            <hr />
            <h3>Type of Employement</h3>
            <ul className="role-based-list-container">
              {employmentTypesList.map((item) => (
                <li className="role-based-list-item">
                  <input
                    type="radio"
                    id={item.employmentTypeId}
                    name="employement-type"
                    value={item.employmentTypeId}
                    onChange={this.changeEmploymentType}
                  />
                  <label htmlFor={item.employmentTypeId}>{item.label}</label>
                </li>
              ))}
            </ul>
            <hr />
            <h3>Salary Range</h3>
            <ul className="salary-based-list-container">
              {salaryRangesList.map((item) => (
                <li className="role-based-list-item">
                  <input
                    type="radio"
                    id={item.label}
                    name="salary-range"
                    value={item.salaryRangeId}
                    onChange={this.changeSalaryRange}
                  />
                  <label htmlFor={item.label}>{item.label}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="right-container">
            <input
              type="search"
              className="search-item"
              placeholder="Search"
              onChange={this.changeSearchInput}
            />
            <ul className="jobs-list-container">
              {updatedJobsList.map((item) => (
                <JobDetailsItem item={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Jobs;
