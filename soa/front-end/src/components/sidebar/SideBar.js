import React from 'react';
import styled from 'styled-components';
import KeywordsFilter from './KeywordsFilter';
import TitleFilter from './TitleFilter';
import DateFilter from './DateFilter';
import { Button } from '@material-ui/core';

const SidebarNav = styled.nav`
	background: #15171c;
	width: 300px;
	display: flex;
	justify-content: center;
	padding : 2px;
	border-radius: 3px;
	margin-bottom : 65px;
`;
const Header = styled.div`
	color: #e1e9fc;
	text-align: center;
	list-style: none;
	text-decoration: none;
	font-size: 30px
`;
const SidebarWrap = styled.div`
  width: 100%;
`;
const Centered = styled.div`
	display: flex;   
	justify-content: center;
	align-items: center;
	margin-top : 20px;
	margin-bottom : 10px;
`;

const SideBar = (props) => {

  // console.log("This is titlepart")
  // console.log(titlePart)
  // console.log("This is matchingkeywords")
  // console.log(matchingkeywords)

  return (
	<>
	  <div>
		<SidebarNav>
		  <SidebarWrap>
			<Header> Filter by </Header>
			<KeywordsFilter matchingkeywords={props.matchingkeywords}  keywords={props.keywords} 
				toggleCheckbox={props.toggleCheckbox} clearKeywordsHandler ={props.clearKeywordsHandler}
			/>
			<TitleFilter value={props.titlePart} titleChangeHandler={props.titleChangeHandler} />
			<DateFilter startDateChangeHandler={props.startDateChangeHandler} startDate={props.startDate}  
				endDateChangeHandler={props.endDateChangeHandler} endDate={props.endDate} clearDateHandler={props.clearDateHandler}
			/>
			<Centered>
			<Button
			  style={{ marginBottom: '0px' }}
			  variant="contained"
			  color="primary"
			  onClick={() => props.fetchdata(props.matchingkeywords,props.titlePart,props.startDate,props.endDate)}
			>   Search 
			</Button>
			</Centered>
		  </SidebarWrap>
		</SidebarNav>
	  </div>
	</>
  );
};

export default SideBar;
