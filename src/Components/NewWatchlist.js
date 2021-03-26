import { db } from "../firebase";

export const NewWatchlist = () => {
  //STORE LAST DOCUMENT (to be able to startAfter-function)
  //   let latestDoc = null;

  //   const getNextReviews = async () => {
  //     const ref = db
  //       .collection("haveWatched")
  //       .orderBy("createdAt")
  //       .startAfter(latestDoc || 0)
  //       .limit(3);
  //     const data = await ref.get();

  //     //OUTPUT DOCS
  //     let template = "";
  //     //data.docs = an array of all the documents

  //     data.docs.forEach((doc) => {
  //       const review = doc.data();
  //       // += is shorthand for appending
  //       template += `
  //     <div class="card">
  //         <h2>${review.movieTitle}</h2>
  //         <strong>User rating: ${review.userRating}</strong>
  //         <p>Average rating: ${review.averageRating}</p>
  //     </div>
  //         `;
  //       //by the end, we'll have a bunch of ^ these inside the template-string
  //     });

  //     // container.innerHTML += template;
  //     //everytime we want to load more data, we don't want to replace all innerHTML, we want to add to it

  //     //UPDATE LATEST DOC
  //     latestDoc = data.docs[data.docs.length - 1];
  //     //docs is an array of the docs that is returned to us
  //   };

  function MovieItem({ id, title, overview, voteAverage, imgComboPath }) {
    // const [toggleState, setToggleState] = useState("Add to Watched");
    // function toggle() {
    //   setToggleState(
    //     toggleState === "Add to Watched"
    //       ? "Remove from Watched"
    //       : "Add to Watched"
    //   );
    // }

    const addToHaveWatched = () => {
      // db.collection("haveWatched").add({...}) = gives a random FB-ID to the document
      //id = the MovieItem-prop. we need toString() because FB only accepts documents id's as strings
      db.collection("haveWatched").doc(id.toString()).set({
        haveWatched: true,
        movieTitle: title,
        voteAverage: voteAverage,
      });
    };

    const removeFromHaveWatched = () => {
      db.collection("haveWatched").doc(id.toString()).delete();
    };

    return (
      <>
        <h1>new watchlist</h1>
        <div>
          <img src={imgComboPath} alt="" />
          <h2>{title}</h2>
          <button onClick={addToHaveWatched}>Add</button>
          <button onClick={removeFromHaveWatched}>Remove </button>
          <span>{voteAverage}</span>
          <strong>Overview</strong>
          <p>{overview}</p>
        </div>
      </>
    );
  }
  return <h2>Test</h2>;
};
