import React, { PureComponent } from "react";
import { Mutation } from "react-apollo";
import { GET_ALL_PLANTS } from "../graphql/queries";
import { ADD_PLANT } from "../graphql/mutations";
import { CLOUDINARY_ENDPOINT, CLOUDINARY_KEY } from "../env";
import styled from "styled-components";

const AddPlantFormStyles = styled.div`
  margin-top: 40px;
  .add-plant {
    display: flex;
    flex-direction: column;
    padding: 30px;
    width: 400px;
    background-color: #fff;
    border-radius: 3px;
    margin: 0 auto;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1),
      0 5px 15px rgba(0, 0, 0, 0.07);
    label {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      font-weight: 600;
      ::placeholder {
        color: #727272;
      }
    }

    .add-plant {
      padding: 30px;
    }

    .text-input {
      border: none;
      background-color: #f2f2f2;
      padding: 10px;
      border-radius: 3px;
      margin-top: 5px;
    }

    .select-input {
      margin-top: 5px;
      background-color: #f2f2f2;
      border: none;
      padding: 10px;
      border-radius: 3px;
      font-family: "Muli", sans-serif;
      color: #727272;
    }

    .file-input {
      margin-top: 5px;
      background-color: #f2f2f2;
      border: none;
      padding: 10px;
      border-radius: 3px;
    }
    input[type="file"] {
      display: none;
    }

    .custom-file-upload {
      background-color: #f2f2f2;
      border: none;
      padding: 10px;
      border-radius: 3px;
      display: block;

      cursor: pointer;
    }

    .add-plant-button {
      border: none;
      background-color: #3f8642;
      color: #fff;
      padding: 10px;
      border-radius: 3px;
      font-size: 18px;
      letter-spacing: 1px;
    }
  }
`;

class AddPlantForm extends PureComponent {
  state = {
    file: {},
    name: "",
    latinName: "",
    location: "",
    image: "",
    wateringInstructions: "",
    light: ""
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleImageChange = e => {
    e.preventDefault();
    this.setState({
      file: e.target.files[0]
    });
  };

  handleSubmit = async ({ e, addPlant }) => {
    const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_ENDPOINT}/image/upload`;
    const { file } = this.state;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ccnpbaqp"); // Replace the preset name with your own
    formData.append("api_key", `${CLOUDINARY_KEY}`); // Replace API key with your own Cloudinary key
    formData.append("timestamp", Date.now()); // Possible fix for no-bitwise parseInt((Date.now() / 1000).toFixed(), 10)

    const plantPicture = await fetch(endpoint, {
      method: `POST`,
      body: formData
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error));
    await this.setState({
      image: plantPicture.secure_url
    });
    addPlant();
  };

  render() {
    const {
      name,
      latinName,
      location,
      image,
      wateringInstructions,
      light
    } = this.state;

    const lightOptions = ["None", "Shade", "Indirect", "Direct"];

    return (
      <Mutation
        mutation={ADD_PLANT}
        variables={{
          name,
          latinName,
          location,
          image,
          wateringInstructions,
          light
        }}
        refetchQueries={[
          {
            query: GET_ALL_PLANTS
          }
        ]}
      >
        {(addPlant, { loading, error }) => (
          <AddPlantFormStyles>
            <div className="add-plant">
              <label htmlFor="name">
                Name
                <input
                  className="text-input"
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={e => this.handleChange(e)}
                  placeholder="Chinese money plant"
                />
              </label>
              <label htmlFor="latinName">
                Latin name
                <input
                  className="text-input"
                  type="text"
                  name="latinName"
                  id="latinName"
                  value={latinName}
                  onChange={e => this.handleChange(e)}
                  placeholder="Pilea peperomioides"
                />
              </label>
              <label htmlFor="wateringInstructions">
                Watering instructions
                <input
                  className="text-input"
                  type="text"
                  name="wateringInstructions"
                  id="wateringInstructions"
                  value={wateringInstructions}
                  onChange={e => this.handleChange(e)}
                  placeholder="Once a week"
                />
              </label>
              <label htmlFor="light">
                Light requirements
                <select
                  className="select-input"
                  name="light"
                  value={light}
                  onChange={e => this.handleChange(e)}
                >
                  {lightOptions.map(item => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label htmlFor="location">
                Where does it originate from
                <input
                  className="text-input"
                  type="text"
                  name="location"
                  id="location"
                  value={location}
                  onChange={e => this.handleChange(e)}
                  placeholder="Southern China"
                />
              </label>
              <label htmlFor="image" className="custom-file-upload">
                Add Image
                <input
                  className="file-input"
                  type="file"
                  name="image"
                  id="image"
                  onChange={e => this.handleImageChange(e)}
                />
              </label>

              <button
                className="add-plant-button"
                type="button"
                disabled={
                  !name ||
                  !latinName ||
                  !location ||
                  !wateringInstructions ||
                  !light
                }
                onClick={e => this.handleSubmit({ e, addPlant })}
              >
                Add plant
              </button>
            </div>
          </AddPlantFormStyles>
        )}
      </Mutation>
    );
  }
}

export default AddPlantForm;
