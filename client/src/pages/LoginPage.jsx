import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const LoginPage = () => {
  const { login, verifyToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "hello@mail.com",
    password: "12345",
    rememberMe: false,
  });

  const verifyTokenAndRedirect = async () => {
    const ok = await verifyToken();
    if (ok) {
      navigate("/chat", { replace: true });
    }
  };

  useEffect(() => {
    // Get email from localStorage on load
    const email = localStorage.getItem("email");
    if (email) {
      setForm((prevForm) => ({
        ...prevForm,
        email: JSON.parse(email),
        rememberMe: true,
      }));
    }

    verifyTokenAndRedirect();
  }, []);

  const onChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeCheckbox = () => {
    setForm((prevForm) => ({
      ...prevForm,
      rememberMe: !prevForm.rememberMe,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Save email in localStorage
    if (form.rememberMe) {
      localStorage.setItem("email", JSON.stringify(form.email));
    } else {
      localStorage.removeItem("email");
    }

    const ok = await login(form.email, form.password);

    if (!ok) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Incorrect email o password",
      });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="login100-form validate-form flex-sb flex-w"
    >
      <span className="login100-form-title mb-3">Chat - Ingreso</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col">
          <input
            className="input-checkbox100"
            id="ckb1"
            type="checkbox"
            name="rememberMe"
            onChange={onChangeCheckbox}
          />
          <label className="label-checkbox100" htmlFor="ckb1">
            Recordarme
          </label>
        </div>

        <div className="col text-end">
          <Link to="/auth/register" className="txt1">
            Nueva cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          className="login100-form-btn"
          disabled={!form.email || !form.password}
        >
          Ingresar
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
