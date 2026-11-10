
.play-home-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin: 20px 0;
}

.color-palette {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.color-palette .kp-sw {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  cursor: pointer;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 16px;
  margin-top: 18px;
}

.gallery-card img {
  width: 100%;
  display: block;
  border-radius: 12px;
  background: white;
  cursor: pointer;
}

.gallery-preview img {
  display: block;
  width: 100%;
  max-width: 650px;
  margin: 12px auto;
  border-radius: 12px;
  background: white;
}

.gallery-card .kp-row {
  margin-top: 10px;
  flex-wrap: wrap;
}

.challenge-finish {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.play-gallery,
.play-home {
  width: 100%;
}

.play-challenges .challenge-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 18px;
}
