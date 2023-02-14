import EmailInput from "./EmailInput";
import CustomModal from "./CustomModal";

const Contact = ({ setModal }) => {
  return (
    <div className="contact">
      <CustomModal setModal={setModal} content={"contact"} />
    </div>
  );
};

export default Contact;
