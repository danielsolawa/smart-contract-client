import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import './Modal.css'

export const InfoModal = ({open, setOpen, title, text, myRef}) => {
    return(
        <div ref={myRef}>
            <Modal
                show={open}
                onHide={() => setOpen(false)}
            >
                <Modal.Header className="font-weight-bold">{title}</Modal.Header>
                <Modal.Body>
                    <p className="modal-p">{text}</p>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => setOpen(false)}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
