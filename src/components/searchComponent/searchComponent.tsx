import React from "react";
import { IPickUpLocation } from "../../components/searchComponent/ISearchComponent";
import serviceGateway from "../../utils/serviceGateway/serviceGateway";
import { PLACE_TYPE } from "../../utils/constants";

const SearchComponent: React.FC = () => {

  const [pickUpLocations, setPickUpLocations] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [isFormError, setIsFormError] = React.useState<boolean>(false);
  const [isSelectedLocation, setIsSelectedLocation] = React.useState(false);

  // function to make service call to fetch all pickup locations
  const getPickUpLocation = (inputValue:string) => {
    // checking input value length is greather than 1
    if (inputValue && inputValue !== "" && inputValue.length > 1) { 
      // setting formerror false
      setIsFormError(false);

      // making service call to fetch data
      serviceGateway
        .getLocations(inputValue)
        .then((data) => {
          if (data.results && data.results.docs.length > 0) {
            // assigning data to picklocation state variable
            setPickUpLocations(data.results.docs);
          } else {
            // if no data found assigning empty array
            setPickUpLocations([]);
          }
          // set show suggestions for location
          setIsSelectedLocation(true);
        })
        .catch((err) => {
          // if no data found assigning empty array
          setPickUpLocations([]);
          // set show suggestions for location
          setIsSelectedLocation(false);
        });
    } else {
      // assigning isFormError true
      setIsFormError(true);
    }
  };

  // function to handle input change and submit button
  const handleOnChange = (value: string, type?: string) => {
    // setting input value
    setInputValue(value);

    // checking if input value greather than 1 
    if (value.length > 1 && type !== "selected") {
      getPickUpLocation(value);
    } else {
      // setting show suggestions false
      setIsSelectedLocation(false);
    }
  };

  return (
    (
      <div data-test="booking-main-container" className="mainContainer">
        <div className="mainContainer-searchBox">
          <h3>Let’s find your ideal car</h3>
          <div className="mainContainer-searchBox__searchArea">
            <div className="searchInput-section">
              <div className="searchInput">
                <div className="input-img">
                  <span
                    className="img-span"
                    data-testid="icon-container"
                    aria-hidden="true"
                    role="presentation"
                  >
                    <svg viewBox="0 0 24 24" width="1em" height="1em">
                      <path d="M21.684 9.443l-1.7-3.79c-.42-1.128-1.542-1.905-2.794-1.903H6.809a2.999 2.999 0 0 0-2.811 1.947L2.316 9.443a.75.75 0 1 0 1.368.614l1.7-3.79c.238-.63.798-1.018 1.424-1.017h10.383a1.5 1.5 0 0 1 1.407.973l1.718 3.834a.75.75 0 1 0 1.368-.614zM.75 16.468V18a2.25 2.25 0 0 0 4.5 0v-1.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 1-1.5 0v-1.532a.75.75 0 0 0-1.5 0zm21 0V18a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 0-1.5 0V18a2.25 2.25 0 0 0 4.5 0v-1.532a.75.75 0 0 0-1.5 0zM19.875 13.5a.375.375 0 0 1-.375-.375.75.75 0 0 0 1.5 0c0-.621-.504-1.125-1.125-1.125a.75.75 0 0 0 0 1.5zm.375-.375a.375.375 0 0 1-.375.375.75.75 0 0 0 0-1.5c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 0 1.5 0zm-.375-.375c.207 0 .375.168.375.375a.75.75 0 0 0-1.5 0c0 .621.504 1.125 1.125 1.125a.75.75 0 0 0 0-1.5zm-.375.375c0-.207.168-.375.375-.375a.75.75 0 0 0 0 1.5c.621 0 1.125-.504 1.125-1.125a.75.75 0 0 0-1.5 0zM4.125 12C3.504 12 3 12.504 3 13.125a.75.75 0 0 0 1.5 0 .375.375 0 0 1-.375.375.75.75 0 0 0 0-1.5zm1.125 1.125c0-.621-.504-1.125-1.125-1.125a.75.75 0 0 0 0 1.5.375.375 0 0 1-.375-.375.75.75 0 0 0 1.5 0zM4.125 14.25c.621 0 1.125-.504 1.125-1.125a.75.75 0 0 0-1.5 0c0-.207.168-.375.375-.375a.75.75 0 0 0 0 1.5zM3 13.125c0 .621.504 1.125 1.125 1.125a.75.75 0 0 0 0-1.5c.207 0 .375.168.375.375a.75.75 0 0 0-1.5 0zM2.75 10.5h18.5c.69 0 1.25.56 1.25 1.25v3.75a.25.25 0 0 1-.25.25H1.75a.25.25 0 0 1-.25-.25v-3.75c0-.69.56-1.25 1.25-1.25zm0-1.5A2.75 2.75 0 0 0 0 11.75v3.75c0 .966.784 1.75 1.75 1.75h20.5A1.75 1.75 0 0 0 24 15.5v-3.75A2.75 2.75 0 0 0 21.25 9H2.75z"></path>
                    </svg>
                  </span>
                </div>
                <input
                  value={inputValue}
                  data-test="input-box"
                  className="input-box"
                  aria-label="Pick-up Location"
                  placeholder="Pick-up Location"
                  type="text"
                  onFocus={(e) => {
                    if (e.target.value.length >= 2) {
                      setIsSelectedLocation(true);
                    }
                  }}
                  onChange={(e: any) => {
                    handleOnChange(e.target.value, 'input');
                  }}
                />
              </div>
              {isFormError && (
                <div className="error-msg">
                  <p data-test="error-msg">Please provide a pick-up location</p>
                </div>
              )}
              <div className="result-section">
                {isSelectedLocation && (
                  <ul className="pickupLocations">
                    {pickUpLocations.length > 0 ? (
                      pickUpLocations.map((value: IPickUpLocation, key:number) =>
                        value.name == "No results found" ? (
                          <li
                            key={key}
                          >
                            <div className="result-toolbox">
                              <div className="result-data">
                                <div className="result-content">
                                  <p className="suggestion-title">
                                    {value.name}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                        ) : (
                          <li
                            key={key}
                            onClick={() => {
                              handleOnChange(
                                value.name +
                                  `, ${value.city ? `${value.city}, ` : ""} ${
                                    value.region ? `${value.region}, ` : ""
                                  } ${value.country}`,
                                "selected"
                              );
                            }}
                          >
                            <div className="result-toolbox">
                              <div className="result-data">
                                <span
                                  className={`badge--primary ${value.placeType}-badge`}
                                >
                                  {PLACE_TYPE[value.placeType]}
                                </span>
                                <div className="result-content">
                                  <p className="suggestion-title">
                                    {value.name}
                                  </p>
                                  <p className="suggestion-subtext">
                                    {value.city ? `${value.city}, ` : ""}
                                    {value.region ? `${value.region}, ` : ""}
                                    {value.country}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                      )
                    ) : (
                      <p className="no-result-found" data-test="no-result-text">
                        No results found.
                      </p>
                    )}
                  </ul>
                )}
              </div>
            </div>
            <div className="submit-button-container">
              <button
                type="button"
                data-test="submit-button"
                className="submit-button"
                onClick={() => {
                  getPickUpLocation(inputValue);
                }}
              >
                <p>Search</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SearchComponent;
