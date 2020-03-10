import styled from "styled-components";
import Link from "components/Link";
import Spinner from "components/Spinner";
import { Formik, Field } from "formik";
import Button from "components/Button";

const Auth = ({ className, type, signUpRequest, loading }) => {
  return (
    <main className={className}>
      <h2 className="heading">{type}</h2>
      {loading && <Spinner />}

      {!loading && (
        <div>
          <Formik
            initialValues={{ email: "", password: "", username: "" }}
            onSubmit={values => {
              signUpRequest({ values, typeOfAuth: type });
            }}
          >
            {props => (
              <form onSubmit={props.handleSubmit} className="form">
                <Field
                  name="username"
                  placeholder="Enter your username"
                  required
                />
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                />
                <Button type="submit">Submit</Button>
              </form>
            )}
          </Formik>
          {type === "register" ? (
            <Link href="/join/login">
              <a>Already a member? Sign in!</a>
            </Link>
          ) : (
            <Link href="/join/register">
              <a>Don't have an account? Register here!</a>
            </Link>
          )}
        </div>
      )}
    </main>
  );
};

export default styled(Auth)`
  text-align: center;
  .heading {
    text-transform: uppercase;
  }
  .form {
    width: 50%;
    margin: 2rem auto;
    text-align: center;

    input {
      margin: 2rem 1rem;
      font-size: inherit;
      padding: 1rem 2rem;
      display: block;
      width: 100%;
    }
  }
`;
