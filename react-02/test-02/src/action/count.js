export const add = () => {
    return {
      type: "add",
    };
  };
  export const minus = () => {
    return {
      type: "minus",
    };
  };
  export const asyAdd = () => dispatch => {
    setTimeout(() => {
      dispatch({
        type: "add",
      });
    }, 1000);
  };
  