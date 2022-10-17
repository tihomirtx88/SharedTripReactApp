import Popup from "reactjs-popup";

const AlertPopUpD = ({ open, closeModal, children }) => {
    return (
        <Popup open={open} onClose={closeModal}>
            <div className="divAlert">
                <a className="divAlertButton" onClick={closeModal}>
                    &times;
                </a>
                <div className="divTextAlert">{children}</div>
            </div>
        </Popup>
    );
};

export default AlertPopUpD;
