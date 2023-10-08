type Props = {
  children: React.ReactNode;
  handleClick: () => void;
};

const SetButton = (props: Props) => {
  return (
    <button
      type="button"
      onClick={props.handleClick}
      className="bg-default-blue-button font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-lg"
    >
      {props.children}
    </button>
  );
};

export default SetButton;
