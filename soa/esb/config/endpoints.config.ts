export const endpoints = [
	{
		id: 0,
		name: "Questions and Answer Service",
		endpoints: [
			{
				id: 0,
				name: "Create Answers",
				method: "Post",
				body: {
					questionId: { type: "number", optional: false },
					text: { type: "string", optional: false },
					username: { type: "string", optional: false },
					dateTime: { type: "Date", optional: false }
				},
				config: {
					headers: {
						'Authorization': 'Bearer my_accessToken',
						'Content-Type': 'application/json',
						'url': 'qa/answers'
					}
				}
			},
			{
				id: 1,
				name: "Update Answer",
				method: "Put",
				body: {
					questionId: { type: "number", optional: true },
					text: { type: "string", optional: true },
					username: { type: "string", optional: true },
					dateTime: { type: "Date", optional: true }
				},
				config: {
					headers: {
						'Authorization': 'Bearer my_accessToken',
						'Content-Type': 'application/json',
						'url': 'qa/answers/:id'
					}
				}
			},
			{
				id: 2,
				name: "Find Filtered Answers",
				method: "Post",
				body: {
					username: { type: "string", optional: true },
				},
				config: {
					headers: {
						'Content-Type': 'application/json',
						'url': 'qa/answers/filtered'
					}
				}
			},
			{
				id: 3,
				name: "Delete Answer",
				method: "Delete",
				config: {
					headers: {
						'Authorization': 'Bearer my_accessToken',
						'Content-Type': 'application/json',
						'url': 'qa/answers/:id'
					}
				}
			},
			{
				id: 4,
				name: "Find Filtered Keywords",
				method: "Post",
				body: {
					keywordPart: { type: "string", optional: true },
					username: { type: "string", optional: true },
				},
				config: {
					headers: {
						'Content-Type': 'application/json',
						'url': 'qa/keywords'
					}
				}
			},
			{
				id: 5,
				name: "Find One Question",
				method: "Get",
				config: {
					headers: {
						'Content-Type': 'application/json',
						'url': 'qa/questions/:id'
					}
				}
			},
			{
				id: 6,
				name: "Find Filtered Questions",
				method: "Post",
				body: {

					titlePart: { type: "string", optional: true },
					startDate: { type: "Date", optional: true },

					endDate: { type: "Date", optional: true },

					username: { type: "string", optional: true },

					matchingKeywords: { type: "string[]", optional: true }
				},
				config: {
					headers: {
						'Content-Type': 'application/json',
						'url': 'qa/questions/filtered'
					}
				}
			},
			{
				id: 7,
				name: "Create Question",
				method: "Post",
				body: {
					title: { type: "string", optional: false },
					text: { type: "string", optional: false },
					username: { type: "string", optional: false },
					dateTime: { type: "Date", optional: false },
					keyword: { type: "Keyword[] where Keyword : {'keyword': mykeyword}", optional: false }
				},
				config: {
					headers: {
						'Authorization': 'Bearer my_accessToken',
						'Content-Type': 'application/json',
						'url': 'qa/questions'
					}
				}
			},
			{
				id: 8,
				name: "Update Question",
				method: "Put",
				body: {
					title: { type: "string", optional: true },
					text: { type: "string", optional: true },
					username: { type: "string", optional: true },
					dateTime: { type: "Date", optional: true },
					keyword: { type: "Keyword[] where Keyword : {'keyword': mykeyword}", optional: false }
				},
				config: {
					headers: {
						'Authorization': 'Bearer my_accessToken',
						'Content-Type': 'application/json',
						'url': 'qa/questions/:id'
					}
				}
			},
			{
				id: 9,
				name: "Delete Question",
				method: "Delete",
				config: {
					headers: {
						'Authorization': 'Bearer my_accessToken',
						'Content-Type': 'application/json',
						'url': 'qa/questions/:id'
					}
				}
			}
		]
	}
	, {
		id: 1,
		name: "Authenticator Service",
		endpoints: [
			{
				id: 0,
				name: "signUp",
				method: "Post",
				body: {
					username: { type: "string", optional: false },
					password: { type: "string", optional: false },
				},
				headers: {
					'Content-Type': 'application/json',
					'url': `auth/signup`
				}
			}
			//Create Request Body
			,
			{
				id: 0,
				name: "signIn",
				method: "Post",
				body: {
					username: { type: "string", optional: false },
					password: { type: "string", optional: false },
				},
				headers: {
					'Content-Type': 'application/json',
					'url': `auth/signup`
				}
			}
		]
	},{
		id: 2,
		name: "Diagram Service",
		endpoints: [
			{
				id: 0,
				name: "Find Filtered Keywords",
				method: "Post",
				body: {
					keywordPart: { type: "string", optional: true },
					username: { type: "string", optional: true },
				},
				config: {
					headers: {
						'Content-Type': 'application/json',
						'url': 'diagram/filtered_keywords'
					}
				}
			},
			{
				id: 1,
				name: "Get contributions per year",
				method: "Post",
				body: {
					year: { type: "number", optional: false },
					username: { type: "string", optional: false }
				},
				config: {
					headers: {
						'Authorization': 'Bearer my_accessToken',
						'Content-Type': 'application/json',
						'url': 'diagram/filtered_keywords'
					}
				}
			},
			{
				id: 2,
				name: "Get contributions per month",
				method: "Post",
				body: {
					month: { type: "number", optional: false },
					year: { type: "number", optional: false },
					username: { type: "string", optional: false }
				},
				config: {
					headers: {
						'Authorization': 'Bearer my_accessToken',
						'Content-Type': 'application/json',
						'url': 'diagram/filtered_keywords'
					}
				}
			},
		]
	}

]
