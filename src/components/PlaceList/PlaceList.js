import "./PlaceList.css";
import Place from "../Place/Place";

function PlaceList(props) {
  //let placesData = props.placesData;
  let placesData = [
    { rank: 1, name: "Portomano", rating: 4.5, numRaters: 22 },
    { rank: 2, name: "Back Stairs", rating: 4.45, numRaters: 22 },
    { rank: 3, name: "Ultra Spice Noodle", rating: 4.44, numRaters: 22 },
    { rank: 4, name: "Sushi Boat", rating: 4.41, numRaters: 22 },
    { rank: 5, name: "Morris Tavern", rating: 4.3, numRaters: 22 },
    { rank: 6, name: "Chicken Yurt", rating: 4.24, numRaters: 22 },
    { rank: 7, name: "Mario's Request", rating: 4.22, numRaters: 22 },
    { rank: 8, name: "Salal Gal", rating: 4.21, numRaters: 22 },
    { rank: 9, name: "A Table & A Chair", rating: 3.9, numRaters: 22 },
    { rank: 10, name: "Brownleaf", rating: 2.5, numRaters: 22 },
  ];

  let places = placesData.map((placeData) => <Place placeData={placeData} />);
  return (
    <div>
      <ul>{places}</ul>
    </div>
  );
}

export default PlaceList;
