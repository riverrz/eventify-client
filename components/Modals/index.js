import { Fragment } from "react";
import { createStructuredSelector } from "reselect";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { pick, isEmpty } from "ramda";
import { makeSelectModals } from "modules/Global/redux/selectors";
import * as actions from "modules/Global/redux/actions";
import Portal from "components/Portal";
import Modal from "./Modal";
import Overlay from "components/Overlay";

function Modals({ modals, closeModal }) {
  return (
    <Fragment>
      <Overlay open={!isEmpty(modals)} />
      {Object.values(modals).map((modal, i) => (
        <Portal key={modal.id}>
          <Modal
            zIndex={i + 1}
            data={modal}
            closeModal={() => closeModal(modal)}
          />
        </Portal>
      ))}
    </Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  modals: makeSelectModals(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(pick(["closeModal"], actions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
