# Deployment of Supabase on StackGres using k8s cluster with minikube

StackGres is a redundant deployment of Postgres on which we will run the Supabase instance.

Link to tutorial: https://stackgres.io/blog/running-supabase-on-top-of-stackgres/

Our deployment step-by-step:

```bash
# Configure minikube resources
minikube config set cpus 4
minikube config set memory 12g
minikube config set disk-size 32g

# Enable CSI and correct storage provisioning on the cluster
minikube addons enable volumesnapshots
minikube addons enable csi-hostpath-driver

minikube addons disable storage-provisioner
minikube addons disable default-storageclass
kubectl patch storageclass csi-hostpath-sc -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'

# Create the Stackgres-operator
helm install --create-namespace --namespace stackgres stackgres-operator stackgres-charts/stackgres-operator

# Wait for deployment and display pods
kubectl wait -n stackgres deployment -l group=stackgres.io --for=condition=Available
kubectl get pods -n stackgres -l group=stackgres.io

# Apply manifests for StackGres
kubectl apply -f poolconfig.yaml
kubectl apply -f script.yaml
kubectl apply -f cluster.yaml

# Describi the StackGres cluster
kubectl describe sgcluster supabase-db

# Go to the supabase-kubernetes folder
cd supabase-kubernetes/charts/supabase