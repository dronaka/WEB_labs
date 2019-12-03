import React from "react";
import "./styles/CityForm.css";

export default function CityForm(props) {
  return (
    <form class="add-city" onSubmit={(e) => props.onSubmit(e)}>
      <input class="input" type="text" name="cityName" placeholder="City name" required={true} />
      <input class="button" type="submit" value="Add to city"/>
    </form>
  );
}