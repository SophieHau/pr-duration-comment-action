# pr-comment-action

This action creates a comment when a PR is closed, informing the user how long it took to complete it.

## Example usage

on:
  pull_request:
    types: [ closed ]

jobs:
  comment:
    runs-on: ubuntu-latest

    steps:
    - name: add a comment
      uses: SophieHau/pr-comment-action@v36
