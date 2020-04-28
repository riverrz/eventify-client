import React from "react";

const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="checkbox"
        value={label}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
        className="checkbox"
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (event) => {
    const target = event.currentTarget;
    let valueArray = this.props.value || [];
  
    if (target.checked) {
      valueArray.push(target.value);
    } else {
      valueArray.splice(valueArray.indexOf(target.value), 1);
    }

    this.props.onChange(this.props.id, valueArray);
  };

  render() {
    const { value, className, children } = this.props;

    const classes = `input-field ${className}`;

    return (
      <div className={classes}>
        <fieldset>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              field: {
                value: value.includes(child.props.label),
                onChange: this.handleChange,
              },
            });
          })}
        </fieldset>
      </div>
    );
  }
}

export { Checkbox, CheckboxGroup };
