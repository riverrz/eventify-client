import { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { createStructuredSelector } from "reselect";
import { pick, path } from "ramda";
import { bindActionCreators } from "redux";
import * as actions from "modules/Dashboard/redux/actions";
import Spinner from "components/Spinner";
import MetaForm from "./MetaForm";

const CreateEvent = ({ className, createEventRequest, loading }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const formDataHandler = useCallback((values) => {
    setFormData({ ...formData, ...values });
  }, []);
  useEffect(() => {
    if (step > 1) {
      createEventRequest(formData);
      setStep(1);
    }
  }, [step]);
  return (
    <main className={className}>
      <h2>Create an event</h2>
      {!loading && (
        <MetaForm
          open={step === 1}
          next={() => setStep(2)}
          submitHandler={formDataHandler}
        />
      )}
      {loading && <Spinner />}
    </main>
  );
};

const StyledCreateEvent = styled(CreateEvent)`
  color: ${({ theme }) => theme.primaryDark};
  .form {
    width: 50%;
    margin: 2rem auto;
    text-align: center;

    .input-field,
    .react-tagsinput {
      margin: 2rem 0;
      font-size: inherit;
      padding: 1rem 2rem;
      display: block;
      width: 100%;
    }
    .react-tagsinput-input {
      font-size: 1rem;
      width: 65%;
    }
    label.upload {
      display: block;
      margin-bottom: 1rem;
    }
    .drop-zone {
      padding: 1rem;
    }
    .divider {
      margin: 1rem;
    }
    button[type="submit"] {
      margin-top: 2rem;
    }
  }
`;

const mapStateToProps = createStructuredSelector({
  loading: path(["dashboard", "createEvent", "loading"]),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(pick(["createEventRequest"], actions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StyledCreateEvent);
