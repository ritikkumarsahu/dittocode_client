import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import useAxiosInstance from "../../hooks/use-axios-instance";

function Download(props) {
  const [data, setData] = useState([]);
  let {getProblems} = useAxiosInstance();
  useEffect(() => {
    getProblems()
      .then(function ([problemsLatestPractices]) {
        setData(problemsLatestPractices);
      }).catch(function (err) {
        alert(err)
      });
  }, [getProblems]);

  const classes = props.className? props.className : "btn btn-primary lift";
  return (
    <CSVLink data={data} filename={"my-file.csv"} className={classes} target="_blank" >
      {props.children}
    </CSVLink>
  );
}

export default Download;