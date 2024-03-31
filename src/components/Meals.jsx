import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./UI/Error";

const requestConfig = {};

function Meals() {
  const {
    fetchedData: meals,
    isFetching,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (error) {
    return <Error title="Failed to fetch meals. " message={error} />;
  }

  // const [meals, setMeals] = useState([]);

  // useEffect(() => {
  //   async function fetchMeals() {
  //     try {
  //       const response = await axios.get("http://localhost:3000/meals");
  //       const fetchedMeals = response.data;

  //       // console.log(fetchedMeals);
  //       setMeals(fetchedMeals);
  //     } catch (error) {
  //       console.error("Error fetching meals:", error.message);
  //     }
  //   }
  //   fetchMeals();
  // }, []);

  return (
    <>
      {meals.length > 0 ? (
        <ul id="meals">
          {meals.map((meal) => (
            <MealItem key={meal.id} meal={meal} />
          ))}
        </ul>
      ) : (
        <p className="center">Loading meals...</p>
      )}
    </>
  );
}

export default Meals;
