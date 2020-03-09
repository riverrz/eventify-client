import styled from "styled-components";
import { Formik, Field } from "formik";
import Button from 'components/Button';

const Auth = ({ className, type, signUpRequest }) => {
  return (
    <main className={className}>
      <h2 className="heading">{type}</h2>
      <Formik
        initialValues={{ email: "", password: "", username: "" }}
        onSubmit={(values) => {
          signUpRequest({ values, typeOfAuth: type });
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit} className="form">
            <Field name="username" placeholder="Enter your username" required />
            <Field type="email" name="email" placeholder="Enter your email" required />
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
    </main>
  );
};

export default styled(Auth)`
  .heading {
    text-align: center;
    text-transform: uppercase;
  }
  .form {
    width: 50%;
    margin: auto;
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
