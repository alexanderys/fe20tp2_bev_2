import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Bar } from "react-chartjs-2";
import { useAuth } from "../../context/AuthContext";

const arrayOfData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const BarChart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();
  const [seenLastWeek, setSeenLastWeek] = useState([]);

  function countMonths(date) {
    let month = date.substring(5, 7);

    switch (month) {
      case "01":
        arrayOfData[0]++;
        break;
      case "02":
        arrayOfData[1]++;
        break;
      case "03":
        arrayOfData[2]++;
        break;
      case "04":
        arrayOfData[3]++;
        break;
      case "05":
        arrayOfData[4]++;
        break;
      case "06":
        arrayOfData[5]++;
        break;
      case "07":
        arrayOfData[6]++;
        break;
      case "08":
        arrayOfData[7]++;
        break;
      case "09":
        arrayOfData[8]++;
        break;
      case "10":
        arrayOfData[9]++;
        break;
      case "11":
        arrayOfData[10]++;
        break;
      case "12":
        arrayOfData[11]++;
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    setSeenLastWeek([]);
    db.collection("users")
      .doc(currentUser.uid)
      .collection("haveWatched")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          seenLastWeek.push(doc.data().addedDate.substring(0, 10));
        });
      })
      .then(() => {
        seenLastWeek.forEach((date) => {
          countMonths(date);
        });
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Bar
            data={{
              labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              datasets: [
                {
                  data: [...arrayOfData],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              title: {
                text: "Your year in movies",
                display: true,
                fontSize: 20,
                fontColor: "white",
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 10,
                      beginAtZero: true,
                    },
                  },
                ],
                xAxes: [
                  {
                    gridLines: { display: false },
                  },
                ],
              },
              legend: {
                display: false,
              },
            }}
          />
        </>
      )}
    </>
  );
};
export default BarChart;
