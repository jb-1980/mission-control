import React from 'react';
import colorScheme from '../../constants/colors';

const colors = colorScheme[window.MC.userProfile.colors]

export default ({mission}) => {
  return(
    <a className="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4"
      href={"/mission/"+mission.code}
      style={{
        textDecoration:"none",
        color:"white",
        position:"relative",
        margin: "0.5rem 0 1rem 0",
        transition: "box-shadow 0.25s",
        borderRadius: "7px",
        boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)",
        backgroundColor: colors.mastery2,
        fontSize: "15px",
        marginRight: "10px",
        marginLeft: "10px",
        minWidth: "250px"
      }}>
      <div style={{
        padding: "20px",
        borderRadius: "0 0 2px 2px",
        color: "#fff"
      }}>
        <span style={{
            lineHeight: "48px",
            fontSize: "24px",
            fontWeight: "500"
          }}>{mission.title}</span>
        <h3>Code: {mission.code}</h3>
      </div>
    </a>
  )
};
