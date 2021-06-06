import React, { useState } from 'react';
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri';
import styled from 'styled-components';
import { TextField, FormControl } from '@material-ui/core';
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
	display: flex; 
	justify-content: center;
	align-items: center;
	padding-top : 10px;
	padding-bottom : 0px;
	`;
const DateWrapper = styled.div`
	background: #5c5f66;
`;
const SidebarLabel = styled.span`
	margin-left: 16px;
`;
// background-color: background: #414757;


const DateFilter = (props) => {
	const [subnav, setSubnav] = useState(false);
	const showSubnav = () => setSubnav(!subnav);

	return (
		<>
			<SidebarLink onClick={showSubnav}>
				<div>
					<SidebarLabel> Dates </SidebarLabel>
				</div>
				<div>
					{subnav
						? <RiArrowUpSFill />
						: <RiArrowDownSFill />
					}
				</div>
			</SidebarLink>
			{subnav &&
				<DateWrapper>

					<Centered>
						<Button
							style={{ marginBottom: '0px' }}
							variant="contained"
							color="primary"
							onClick={props.clearDateHandler}
						>
							Clear
						</Button>
					</Centered>
						<FormControl fullWidth>
							<TextField
								type="date"
								margin="normal"
								variant="outlined"
								color="primary"
								size="small"
								value={props.startDate}
								onChange={props.startDateChangeHandler}
							// InputProps = {{ inputProps : {min : '2000-01-01',max  : '2100-12-31'}}}
							/>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								type="date"
								margin="normal"
								size="small"
								variant="outlined"
								color="primary"
								value={props.endDate}
								onChange={props.endDateChangeHandler}

							/>
						</FormControl>
				</DateWrapper>
			}
		</>
	)
};

export default DateFilter;