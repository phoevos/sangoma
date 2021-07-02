import React, { useState } from 'react';
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri';
import styled from 'styled-components';
import Checkbox from './Checkbox';
import { Button } from '@material-ui/core';

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
const Centered = styled.div`
display: flex;         /* NEW, Spec - Firefox, Chrome, Opera */
	
justify-content: center;
align-items: center;
padding-top : 10px;
padding-bottom : 10px;
`;
const KeywordWrapper = styled.div`
background: #5c5f66;
`;
const SidebarLabel = styled.span`
	margin-left: 16px;
`;
//background: #414757;
const DropdownLink = styled.div`
	height: 20px;
	padding-left: 1rem;
	display: flex;
	align-items: center;
	text-decoration: none;
	color: #f5f5f5;
	font-size: 15px;

	&:hover {
		background: #632ce4;
	}
`;

const FilterKeywords = (props) => {
	const [subnav, setSubnav] = useState(false)

	const showSubnav = () => setSubnav(!subnav)


	return (
		<>

			<SidebarLink onClick={showSubnav}>
				<div>
					<SidebarLabel> Keywords </SidebarLabel>
				</div>
				<div>
					{subnav
						? <RiArrowUpSFill />
						: <RiArrowDownSFill />
					}
				</div>
			</SidebarLink>
			{subnav && <KeywordWrapper>

				<Centered>
					<Button
						style={{ marginBottom: '0px' }}
						variant="contained"
						color="primary"
						onClick={props.clearKeywordsHandler}
					>
						Clear
					</Button>
				</Centered>

				{props.keywords.map((item, index) =>
					<DropdownLink key={index}>
						<Checkbox handleCheckbox={props.toggleCheckbox} keyword={item.keyword} matchingkeywords={props.matchingkeywords} />
						<SidebarLabel>{item.keyword}</SidebarLabel>
					</DropdownLink>

				)}
			</KeywordWrapper>
			}
		</>
	);
};

export default FilterKeywords;
