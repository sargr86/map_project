export default class CheckIfCoverImageWhenRemoving {
  static check(currentImg, coverImg) {
    currentImg = currentImg.substring(currentImg.lastIndexOf('/') + 1);
    if (coverImg) {
      coverImg = coverImg.substring(coverImg.lastIndexOf('/') + 1);
    }

    return currentImg === coverImg;

  }
}
