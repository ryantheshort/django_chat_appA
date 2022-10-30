import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function UserLogin(props) {
  return (
    <div className="user-login">
      <LoginForm setAuth={props.setAuth} setUser={props.setUser} />
      <RegisterForm setAuth={props.setAuth} />
    </div>
  );
}

export default UserLogin;