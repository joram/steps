run:
	cd api; sudo uvicorn main:app --host 0.0.0.0 --reload --port 5000

run_remote:
	ssh -t ubuntu@steps "cd /home/ubuntu/steps; make run"

run_local:
	cd api; uvicorn main:app --host 0.0.0.0 --reload --port 5000

