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

# Get StackGres password instance to use in secrets
kubectl get secret supabase-db --template '{{ printf "%s" (index .data "superuser-password" | base64decode) }}'

# Create the secrets using this password for Postgres
# creates JWT secret
kubectl -n default create secret generic demo-supabase-jwt \
  --from-literal=anonKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjc1NDAwNDAwLAogICAgImV4cCI6IDE4MzMxNjY4MDAKfQ.ztuiBzjaVoFHmoljUXWmnuDN6QU2WgJICeqwyzyZO88' \
  --from-literal=serviceKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2NzU0MDA0MDAsCiAgICAiZXhwIjogMTgzMzE2NjgwMAp9.qNsmXzz4tG7eqJPh1Y58DbtIlJBauwpqx39UF-MwM8k' \
  --from-literal=secret='abcdefghijklmnopqrstuvwxyz123456'

# creates SMTP secret
kubectl -n default create secret generic demo-supabase-smtp \
  --from-literal=username='your-mail@example.com' \
  --from-literal=password='example123456'

# creates DB secret
kubectl -n default create secret generic demo-supabase-db \
  --from-literal=username='postgres' \
  --from-literal=password='8a86-c0d3-4689-b00' \
  --from-literal=database='supabase-db.default.svc.cluster.local'

# Deploy cluster on default namespace
helm install demo -f values.stackgres.yaml .

```