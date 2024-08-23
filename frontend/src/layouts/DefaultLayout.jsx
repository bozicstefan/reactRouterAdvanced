import MainNavigation from "../components/MainNavigation";
import { Outlet /* useNavigation */ } from "react-router-dom";
const DefaultLayout = () => {
  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === "loading" && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
};

export default DefaultLayout;
