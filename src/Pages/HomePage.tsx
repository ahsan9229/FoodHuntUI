import LandingImg from "../assets/images/landing.png";
import AppDownImg from "../assets/images/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="md:px-3 rounded-lg  md:py-2 py-10 flex flex-col gap-5 text-center md:-mt-[15%] -mt-[20%] items-center ">
        <SearchBar
          placeHolder="Search by city or Town"
          onSubmit={handleSearchSubmit}
        />
        <h1 className="md:text-5xl text-4xl font-bold tracking-tight text-orange-600">
          Tuck into a takeway today
        </h1>
        <span className="md:text-xl text-md"> Food is just click away!</span>
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        <img src={LandingImg} alt="" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            {" "}
            Order Takeaway even faster!
          </span>
          <span>
            {" "}
            Downlaod FoodHunt App for faster prdering and personalised
            recommendations
          </span>
          <img src={AppDownImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
