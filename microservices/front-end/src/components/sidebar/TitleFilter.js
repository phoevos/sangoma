import React, { useState } from 'react';
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri';
import styled from 'styled-components';
import { TextField, FormControl } from '@material-ui/core';


const SidebarLink = styled.div`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;
// background-color: background: #414757;
const Container = styled.div`
    background: #5c5f66;

`;


const TitleFilter = (props) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink onClick={showSubnav}>
        <div>
          <SidebarLabel> Title </SidebarLabel>
        </div>
        <div>
          {subnav
            ? <RiArrowUpSFill />
            : <RiArrowDownSFill />
          }
        </div>
      </SidebarLink>
      {subnav &&
        <Container>
          <FormControl fullWidth>
            <TextField
              label="Title"
              placeholder="Title"
              multiline
              size="small"
              margin="normal"
              variant="outlined"
              color="primary"
              value={props.value}
              onChange={props.titleChangeHandler}
            />
          </FormControl>
        </Container>
      }
    </>
  )
};

export default TitleFilter;
