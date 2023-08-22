import './EditableSpan.css';

const EditableSpan = ({ editMode, title }) => {
  return editMode ? (
    <input className="editable-span" type="text" />
  ) : (
    <span className="editable-span">{title}</span>
  );
};

export default EditableSpan;
