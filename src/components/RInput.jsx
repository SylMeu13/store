import styled from "styled-components";

const SRInput = styled.div`
  width: 100%;
  height: 100%;

  > div {
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    gap: 0.5em;
    width: 100%;
    height: 100%;

    > input {
      width: 100%;
    }

    > textarea {
      width: 100%;
      height: 100%;
    }
  }

  .option {
    margin-inline: 5px;
  }

  .error {
    color: red;
    font-size: small;
  }
`;

export default function RInput({
  label,
  type = "text",
  options,
  error = "",
  ...props
}) {
  return (
    <SRInput>
      {type === "radio" ? (
        <div>
          {label && <span>{label} : </span>}
          {options.map((option) => (
            <span className="option" key={option.value}>
              <label htmlFor={option.value}>{option.label}</label>
              <input
                type="radio"
                id={option.value}
                value={option.value}
                {...props}
              />
            </span>
          ))}
        </div>
      ) : type === "select" ? (
        <div>
          {label && <label htmlFor={props.id}>{label} : </label>}
          <select {...props}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      ) : type === "textarea" ? (
        <div>
          {label && <label htmlFor={props.id}>{label} : </label>}
          <textarea {...props} />
        </div>
      ) : (
        <div>
          {label && <label htmlFor={props.id}>{label} : </label>}
          <input type={type} {...props} />
        </div>
      )}
      {error && <div className="error">{error.message}</div>}
    </SRInput>
  );
}
