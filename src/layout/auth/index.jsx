import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      <div className="flex min-h-[600px] h-full w-full">
        <div className="w-[100%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
