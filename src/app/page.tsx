"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Page = () => {
  // Main category state
  const [categoryName, setCategoryName] = useState("");

  // Sub-categories state
  const [subCategories, setSubCategories] = useState([
    {
      name: "",
      subSubCategories: [
        {
          name: "",
          chooses: [
            {
              name: "",
              options: [""],
            },
          ],
        },
      ],
    },
  ]);

  // Handle changes for sub-categories
  const handleSubCategoryChange = (index: number, value: string) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index].name = value;
    setSubCategories(updatedSubCategories);
  };

  // Handle changes for sub-sub-categories
  const handleSubSubCategoryChange = (
    subCatIndex: number,
    subSubCatIndex: number,
    value: string
  ) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[subCatIndex].subSubCategories[subSubCatIndex].name =
      value;
    setSubCategories(updatedSubCategories);
  };

  // Handle changes for chooses
  const handleChooseChange = (
    subCatIndex: number,
    subSubCatIndex: number,
    chooseIndex: number,
    value: string
  ) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[subCatIndex].subSubCategories[subSubCatIndex].chooses[
      chooseIndex
    ].name = value;
    setSubCategories(updatedSubCategories);
  };

  // Handle changes for options
  const handleOptionChange = (
    subCatIndex: number,
    subSubCatIndex: number,
    chooseIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[subCatIndex].subSubCategories[subSubCatIndex].chooses[
      chooseIndex
    ].options[optionIndex] = value;
    setSubCategories(updatedSubCategories);
  };

  // Add new sub-category
  const addSubCategory = () => {
    setSubCategories([
      ...subCategories,
      {
        name: "",
        subSubCategories: [
          {
            name: "",
            chooses: [
              {
                name: "",
                options: [""],
              },
            ],
          },
        ],
      },
    ]);
  };

  // Add new sub-sub-category
  const addSubSubCategory = (subCatIndex: number) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[subCatIndex].subSubCategories.push({
      name: "",
      chooses: [
        {
          name: "",
          options: [""],
        },
      ],
    });
    setSubCategories(updatedSubCategories);
  };

  // Add new choose
  const addChoose = (subCatIndex: number, subSubCatIndex: number) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[subCatIndex].subSubCategories[
      subSubCatIndex
    ].chooses.push({
      name: "",
      options: [""],
    });
    setSubCategories(updatedSubCategories);
  };

  // Add new option
  const addOption = (
    subCatIndex: number,
    subSubCatIndex: number,
    chooseIndex: number
  ) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[subCatIndex].subSubCategories[subSubCatIndex].chooses[
      chooseIndex
    ].options.push("");
    setSubCategories(updatedSubCategories);
  };

  // Handle form submission
  const handleSubmit = async () => {
    const categoryData = {
      name: categoryName,
      subCategories: subCategories,
    };

    try {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();
      console.log("Category created:", data);
    } catch (error) {
      console.error("Error submitting category data", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Category Name Input */}
            <div>
              <Label>Category Name:</Label>
              <Input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            {/* Sub-Categories */}
            {subCategories.map((subCategory, subCatIndex) => (
              <div key={subCatIndex} className="space-y-4 border p-4 rounded">
                <Label>Sub-Category Name:</Label>
                <Input
                  type="text"
                  value={subCategory.name}
                  onChange={(e) =>
                    handleSubCategoryChange(subCatIndex, e.target.value)
                  }
                />

                {/* Sub-Sub-Categories */}
                {subCategory.subSubCategories.map(
                  (subSubCategory, subSubCatIndex) => (
                    <div
                      key={subSubCatIndex}
                      className="space-y-4 border p-4 rounded"
                    >
                      <Label>Sub-Sub-Category Name:</Label>
                      <Input
                        type="text"
                        value={subSubCategory.name}
                        onChange={(e) =>
                          handleSubSubCategoryChange(
                            subCatIndex,
                            subSubCatIndex,
                            e.target.value
                          )
                        }
                      />

                      {/* Chooses */}
                      {subSubCategory.chooses.map((choose, chooseIndex) => (
                        <div
                          key={chooseIndex}
                          className="space-y-4 border p-4 rounded"
                        >
                          <Label>Choose Name:</Label>
                          <Input
                            type="text"
                            value={choose.name}
                            onChange={(e) =>
                              handleChooseChange(
                                subCatIndex,
                                subSubCatIndex,
                                chooseIndex,
                                e.target.value
                              )
                            }
                          />

                          {/* Options */}
                          <Label>Options:</Label>
                          {choose.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="mb-2">
                              <Input
                                type="text"
                                value={option}
                                onChange={(e) =>
                                  handleOptionChange(
                                    subCatIndex,
                                    subSubCatIndex,
                                    chooseIndex,
                                    optionIndex,
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          ))}
                          <Button
                            type="button"
                            onClick={() =>
                              addOption(
                                subCatIndex,
                                subSubCatIndex,
                                chooseIndex
                              )
                            }
                          >
                            Add Option
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        onClick={() => addChoose(subCatIndex, subSubCatIndex)}
                      >
                        Add Choose
                      </Button>
                    </div>
                  )
                )}
                <Button
                  type="button"
                  onClick={() => addSubSubCategory(subCatIndex)}
                >
                  Add Sub-Sub-Category
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addSubCategory}>
              Add Sub-Category
            </Button>
          </div>

          {/* Submit Button */}
          <Button onClick={handleSubmit} className="mt-4">
            Create Category
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
