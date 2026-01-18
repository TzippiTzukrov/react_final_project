import '../styles/GenericFormModal.css';

function GenericFormModal({ 
  isOpen, 
  onClose, 
  title,
  onSubmit, 
  children,
  submitText = "Save", 
  cancelText = "Cancel" 
}) {

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSubmit(e);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button 
            type="button" 
            className="modal-close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            {children}
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="modal-button modal-button-cancel"
              onClick={onClose}
            >
              {cancelText}
            </button>
            <button 
              type="submit" 
              className="modal-button modal-button-submit"
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GenericFormModal;