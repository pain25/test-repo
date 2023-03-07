import styled from "styled-components";
import { FormState } from "../Form";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
require("dotenv").config();

// import { Buffer } from "buffer";
// import pinataSDK from "@pinata/sdk";

const FormRightWrapper = () => {
  const Handler = useContext(FormState);

  const [uploadLoading, setUploadLoading] = useState(null);
  const [uploaded, setUploaded] = useState("");

  //to upload the files
  // this function will be called in the form
  {
    /*uploadFiles start*/
  }
  const uploadFiles = async (e) => {
    //allow the form not to refresh
    e.preventDefault();
    setUploadLoading(true);

    // const ipfsGateway = "https://ipfs.io";
    const formData = new FormData();
    formData.append("file", Handler.image);

    //it takes the data and convert it to json format
    const inputData = `{"name": "${Handler.form.story}"}`;

    //it converts it to json file
    const jsonObj = JSON.parse(inputData);

    //code to upload text to the ipfs
    if (Handler.form.story !== "") {
      try {
        const response = await axios.post(
          "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          jsonObj,
          {
            headers: {
              pinata_api_key: process.env.NEXT_PUBLIC_IPFS_ID,
              pinata_secret_api_key: process.env.NEXT_PUBLIC_IPFS_KEY,
            },
          }
        );
        //we need to provide url of the story
        Handler.setStoryUrl(response.data.IpfsHash);
        console.log(typeof response.data.IpfsHash);
      } catch (error) {
        toast.warn(`Error Uploading Story`);
        console.log(error);
      }
    }

    //code to upload image to the ipfs
    if (Handler.image !== null) {
      try {
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: process.env.NEXT_PUBLIC_IPFS_ID,
            pinata_secret_api_key: process.env.NEXT_PUBLIC_IPFS_KEY,
            "Content-Type": "multipart/form-data",
          },
        });
        Handler.setImageUrl(resFile.data.IpfsHash);
        console.log(typeof resFile.data.IpfsHash);
      } catch (error) {
        toast.warn(`Error Uploading Image`);
        console.log(error);
      }
    }

    setUploadLoading(false);
    setUploaded(true);
    Handler.setUploaded(true);
    toast.success("Files Uploaded Sucessfully");
  };
  {
    /*uploadFiles end*/
  }

  return (
    <FormRight>
      <FormInput>
        <FormRow>
          <RowFirstInput>
            <label>Required Amount</label>
            <Input
              onChange={Handler.FormHandler}
              value={Handler.form.requiredAmount}
              name="requiredAmount"
              type={"number"}
              placeholder="Required Amount"
            ></Input>
          </RowFirstInput>
          <RowSecondInput>
            <label>Choose Category</label>
            <Select
              onChange={Handler.FormHandler}
              value={Handler.form.category}
              name="category"
            >
              <option>Education</option>
              <option>Health</option>
              <option>Animal</option>
            </Select>
          </RowSecondInput>
        </FormRow>
      </FormInput>
      {/* Image */}
      <FormInput>
        <label>Select Image</label>
        <Image
          alt="dapp"
          onChange={Handler.ImageHandler}
          type={"file"}
          accept="image/*"
        ></Image>
      </FormInput>
      {uploadLoading == true ? (
        <Button>
          <TailSpin color="#fff" height={20} />
        </Button>
      ) : uploaded == false ? (
        <Button onClick={uploadFiles}>Upload Files to IPFS</Button>
      ) : (
        <Button style={{ cursor: "no-drop" }}>
          Files uploaded Sucessfully
        </Button>
      )}
      <Button onClick={Handler.startCampaign}>Start Campaign</Button>
    </FormRight>
  );
};

const FormRight = styled.div`
  width: 45%;
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "poppins";
  margin-top: 10px;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Input = styled.input`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
`;

const RowFirstInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const RowSecondInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const Select = styled.select`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
`;

const Image = styled.input`
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;

  &::-webkit-file-upload-button {
    padding: 15px;
    background-color: ${(props) => props.theme.bgSubDiv};
    color: ${(props) => props.theme.color};
    outline: none;
    border: none;
    font-weight: bold;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px;
  color: white;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  border: none;
  margin-top: 30px;
  cursor: pointer;
  font-weight: bold;
  font-size: large;
`;

export default FormRightWrapper;
