import React,{useState, useRef} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import SearchIcon from "@material-ui/icons/Search";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import { GetActorByFirstName } from 'utils/API';

import styles from "assets/jss/material-kit-react/views/searchPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

function SearchPage(props) {
  const search = useRef();
  const [searchedActor, setSearchedActor] = useState([])
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  
  const handleFormSubmit = async function(event) {
    event.preventDefault();
    let searchValue = search.current.value;
    try {
      let results = await GetActorByFirstName(searchValue);
      setSearchedActor(results.data.ActorMany)
      console.log(results);
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Header
        absolute
        color="info"
        brand="Shaun Was Here"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h3 style={{ marginTop: "2rem", fontWeight: "bold" }}>
                      FIND AN ACTOR
                    </h3>
                    <div className={classes.socialLine}>
                      <div style={{ textAlign: "center" }}>
                        <h6></h6>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Search Actor..."
                      id="first"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        inputRef: search,
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div style={{ textAlign: "center" }}>
                      <Button onClick={handleFormSubmit} justify="center" type="button" color="info">
                        Find Actor
                      </Button>
                    </div>
                    
                    {searchedActor.length ? (
              <div className={classes.section}>
                {searchedActor.map(actor => {
                  return (
                   <Card>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={8}>
                            <h2 className={classes.title}>Actor Name</h2>
                        </GridItem>
                    </GridContainer>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={3} md={3}>
                                <h4>{actor.firstname}</h4>
                            </GridItem>
                            <GridItem xs={12} sm={3} md={3}>
                                <h4>{actor.lastname}</h4>
                            </GridItem>
                        </GridContainer>
                            <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={8}>
                            <h2 className={classes.title}>Measurements</h2>
                        </GridItem>
                    </GridContainer>
                    <GridContainer justify="center">
                    <GridItem xs={12} sm={3} md={3}>
                                <h4>{actor.measurements[0].chest}</h4>
                            </GridItem>
                            <GridItem xs={12} sm={3} md={3}>
                                <h4>{actor.measurements[0].waist}</h4>
                            </GridItem>
                            <GridItem xs={12} sm={3} md={3}>
                                <h4>{actor.measurements[0].weight}</h4>
                            </GridItem>
                        </GridContainer>
                        </Card>
                    
                  );
                })}
              </div>
            ) : (
              <h3>No Results to Display</h3>
            )}
                  </CardBody>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

export default SearchPage;
