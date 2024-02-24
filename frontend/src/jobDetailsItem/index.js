import "bootstrap/dist/css/bootstrap.css";
import { ImFacebook2 } from "react-icons/im";
import { IoLocationOutline } from "react-icons/io5";
import { PiSuitcaseSimple } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import "./index.css";

const JobDetailsItem = (props) => {
  const { item } = props;
  return (
    <li className="job-detail-item">
      <div className="d-flex">
        <ImFacebook2 className="company-icons" />
        <div className="mt-4">
          <h6>{item.job_role}</h6>
          <p className="rating-text">
            {item.rating}
            <FaStar className="star-icon" />
          </p>
        </div>
      </div>
      <div className="d-flex">
        <IoLocationOutline className="m-2" />
        <p className="mr-4 location-text">{item.location}</p>
        <PiSuitcaseSimple className="m-2" />
        <p className="ml-2 location-text">{item.timer}</p>
      </div>
      <hr className="line" />
      <p>{item.description}</p>
    </li>
  );
};

export default JobDetailsItem;
