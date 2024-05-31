/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import verifyToken from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "admin123",
    },
  });
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");
    try{

      const res = await login(data).unwrap();
      console.log(data, res);
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      navigate(`/${user.role}/dashboard`);
      toast.success("Login Successful" , {id: toastId, duration: 2000})
    }
    catch(err){
      toast.error("Login Failed", {id: toastId, duration: 2000})
      console.log(err)
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID: </label>
        <input {...register("id")} type="text" id="id" />
      </div>
      <div>
        <label htmlFor="Password">Password: </label>
        <input {...register("password")} type="text" id="Password" />
      </div>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </form>
  );
};

export default Login;
