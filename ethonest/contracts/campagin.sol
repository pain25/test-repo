//SPDX-License-Identifier:None
pragma solidity ^0.8.17;

//initializing campagin
contract CampaignFactory {
    // array to store all the accounts
    address[] public deployedCampaigns;

    //to get the details in the frontend
    event campaignCreated(
        string title,
        uint requiredAmount,
        address indexed owner,
        address campaignAddress,
        string imgURL,
        uint indexed timestamp,
        string indexed category,
        bool isActive
    );

    function createCampagin(
        string memory campaignTitle,
        uint requiredCampaignAmount,
        string memory imgURL,
        string memory category,
        string memory storyURL,
        bool isActive
    ) public {
        Campaign newCampaign = new Campaign(
            campaignTitle,
            requiredCampaignAmount,
            imgURL,
            storyURL,
            msg.sender,
            isActive
        );

        //pushes the address of the account to the array
        deployedCampaigns.push(address(newCampaign));
        emit campaignCreated(
            campaignTitle,
            requiredCampaignAmount,
            msg.sender,
            address(newCampaign),
            imgURL,
            block.timestamp,
            category,
            isActive
        );
    }
}

contract Campaign {
    string public title; // title of the campaign
    uint public requiredAmount; // amount required by the one who created
    string public image; // link of the image stored in the ipfs
    string public story; // story of the one who is asking the money
    address payable public owner; //account in which the moeny is to be transferd
    uint public receivedAmount; // totala amount received
    bool public isActive; // Flag indicating whether the campaign is active or nots

    //donar :the account of the  who donated
    //amount: how much amount does donar has donated
    //timestamp; at what time this transaction happend
    event donated(
        address indexed donar,
        uint indexed amount,
        uint indexed timestamp
    );

    //constructor to take input from the user
    constructor(
        string memory campaignTitle,
        uint requiredCampaignAmount,
        string memory imgURL,
        string memory storyURL,
        address campaignOwner,
        bool initialIsActive
    ) {
        title = campaignTitle;
        requiredAmount = requiredCampaignAmount;
        image = imgURL;
        story = storyURL;
        owner = payable(campaignOwner);
        isActive = initialIsActive;
    }

    //function to donate
    //if required amount is greater then recevied amount than only run the function
    //or else pass the message
    function donate() public payable {
        require(isActive, "Campaign is inactive");
        require(requiredAmount > receivedAmount, "requires amount fullfilled");
        owner.transfer(msg.value); //transfer the money of the owner
        receivedAmount += msg.value; // addes up the recevied amount

        /*msg.value: how much to be transferd
         block.timestamp: the time at which this block was created */
        emit donated(msg.sender, msg.value, block.timestamp); // to access from the frontend
    }

    // Function to toggle the campaign status
    function toggleStatus() public {
        require(
            msg.sender == owner,
            "Only the owner can toggle the campaign status"
        );
        isActive = !isActive;
    }
}
