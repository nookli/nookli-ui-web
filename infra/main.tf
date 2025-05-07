provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_artifact_registry_repository" "frontend" {
  location      = var.region
  repository_id = var.repo_name
  format        = "DOCKER"
  description   = "Frontend container registry"
}
