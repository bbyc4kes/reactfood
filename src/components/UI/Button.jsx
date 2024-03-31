function Button({ children, textBtn, className, ...props }) {
  let cssClasses = textBtn ? "text-button" : "button";
  cssClasses += " " + className;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}

export default Button;
