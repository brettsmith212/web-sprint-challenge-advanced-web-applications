import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import MutationObserver from "mutationobserver-shim";

import Article from "./Article";

const articleTestData = {
  id: 0,
  headline:
    "Less than half of Seattle homes have air conditioning. After a deadly heat wave, ‘everybody’ wants it.",
  createdOn: "1/1/2022",
  author: "Glen Jones",
  image: 134,
  summary:
    "Triple-digit temperatures led to a spike in demand across the region.",
  body: "Inside the attic of a one-story gray house in a Seattle suburb last week, Jeff Bryson gingerly strapped copper piping across the rafters while wearing a white face mask and a headlamp. The temperature was about 110 degrees in the tight space, which was covered in insulation dust. His work was meant to cool the rest of the home.",
};

const articleNoAuthorData = {
  id: 0,
  headline:
    "Less than half of Seattle homes have air conditioning. After a deadly heat wave, ‘everybody’ wants it.",
  createdOn: "1/1/2022",
  author: "",
  image: 134,
  summary:
    "Triple-digit temperatures led to a spike in demand across the region.",
  body: "Inside the attic of a one-story gray house in a Seattle suburb last week, Jeff Bryson gingerly strapped copper piping across the rafters while wearing a white face mask and a headlamp. The temperature was about 110 degrees in the tight space, which was covered in insulation dust. His work was meant to cool the rest of the home.",
};

const handleDelete = "none";
const handleEditSelect = "none";

test("renders component without errors", () => {
  render(
    <Article
      article={articleTestData}
      handleDelete={handleDelete}
      handleEditSelect={handleEditSelect}
    />
  );
});

test("renders headline, author from the article when passed in through props", () => {
  render(
    <Article
      article={articleTestData}
      handleDelete={handleDelete}
      handleEditSelect={handleEditSelect}
    />
  );

  const headline = screen.queryByTestId("headline");
  const headlineText = screen.queryByText(articleTestData.headline);
  const author = screen.queryByTestId("author");
  const authorText = screen.queryByText("By " + articleTestData.author);
  const summary = screen.queryByTestId("summary");
  const summaryText = screen.queryByText(articleTestData.summary);
  const body = screen.queryByTestId("body");
  const bodyText = screen.queryByText(articleTestData.body);

  expect(headline).toBeInTheDocument();
  expect(headlineText).toBeTruthy();
  expect(author).toBeInTheDocument();
  expect(authorText).toBeTruthy();
  expect(summary).toBeInTheDocument();
  expect(summaryText).toBeTruthy();
  expect(body).toBeInTheDocument();
  expect(bodyText).toBeTruthy();
});

test('renders "Associated Press" when no author is given', () => {
  render(
    <Article
      article={articleNoAuthorData}
      handleDelete={handleDelete}
      handleEditSelect={handleEditSelect}
    />
  );

  const author = screen.queryByTestId("author");
  const authorText = screen.queryByText("By Associated Press");
  expect(author).toBeInTheDocument();
  expect(authorText).toBeTruthy();
});

test("executes handleDelete when the delete button is pressed", () => {
  const mockHandleDelete = jest.fn();

  render(
    <Article
      article={articleTestData}
      handleDelete={mockHandleDelete}
      handleEditSelect={handleEditSelect}
    />
  );

  const button = screen.getByTestId("deleteButton");
  userEvent.click(button);

  expect(mockHandleDelete).toHaveBeenCalled();
});

//Task List:
//1. Complete all above tests. Create test article data when needed.
