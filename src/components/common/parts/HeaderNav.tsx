type Props = {
  handleClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
};

const HeaderNav = (props: Props) => {
  return (
    <div
      className={`py-2 px-10 mr-2 cursor-pointer  ${
        props.isActive ? "text-blue-500 bg-slate-200 border-b-2 border-blue-500" : null
      }`}
      onClick={props.handleClick}
    >
      {props.children}
    </div>
  );
};

export default HeaderNav;
