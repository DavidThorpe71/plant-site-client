import React, { PureComponent, ChangeEvent } from "react";
import { Mutation } from "react-apollo";
import { GET_ALL_PLANTS } from "../graphql/queries";
import { ADD_PLANT } from "../graphql/mutations";
import { CLOUDINARY_ENDPOINT, CLOUDINARY_KEY } from "../env";
interface Data {
  addPlant: {
    _id: string;
    name: string;
  };
}

interface Variables {
  name: string;
  latinName: string;
  location: string;
  image: string;
  wateringInstructions: string;
  light: string;
}

class AddPlantForm extends PureComponent {
  state = {
    file: "",
    name: "",
    latinName: "",
    location: "",
    image: "",
    wateringInstructions: "",
    light: ""
  };

  handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e || !e.target || !e.target.files) {
      return null;
    }
    this.setState({
      file: e.target.files[0]
    });
  };

  handleSubmit = async ({ addPlant }: { addPlant: Function }) => {
    const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_ENDPOINT}/image/upload`;
    const { file } = this.state;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ccnpbaqp"); // Replace the preset name with your own
    formData.append("api_key", `${CLOUDINARY_KEY}`); // Replace API key with your own Cloudinary key
    formData.append("timestamp", String(Date.now())); // Possible fix for no-bitwise parseInt((Date.now() / 1000).toFixed(), 10)

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
      <Mutation<Data, Variables>
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
          <>
            <div className="add-plant">
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={e => this.handleChange(e)}
                />
              </label>
              <label htmlFor="latinName">
                Latin name
                <input
                  type="text"
                  name="latinName"
                  id="latinName"
                  value={latinName}
                  onChange={e => this.handleChange(e)}
                />
              </label>
              <label htmlFor="wateringInstructions">
                Watering instructions
                <input
                  type="text"
                  name="wateringInstructions"
                  id="wateringInstructions"
                  value={wateringInstructions}
                  onChange={e => this.handleChange(e)}
                />
              </label>
              <label htmlFor="light">
                Light requirements
                <select
                  name="light"
                  value={light}
                  onChange={e => this.handleChange(e)}
                >
                  {lightOptions.map((item, i) => (
                    <option value={item} key={`${item}-${i}`}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="location">
                Where does it originate from
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={location}
                  onChange={e => this.handleChange(e)}
                />
              </label>
              <label htmlFor="image">
                Add Image
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={e => this.handleImageChange(e)}
                />
              </label>

              <button
                type="button"
                disabled={
                  !name ||
                  !latinName ||
                  !location ||
                  !wateringInstructions ||
                  !light ||
                  loading
                }
                onClick={() => this.handleSubmit({ addPlant })}
              >
                Submit
              </button>
              {error && <span>Unable to submit this</span>}
            </div>
          </>
        )}
      </Mutation>
    );
  }
}

export default AddPlantForm;
