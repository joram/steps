run:
	cd api; sudo uvicorn main:app --host 0.0.0.0 --reload --port 5000

remote_run:
	ssh -t ubuntu@steps "cd /home/ubuntu/steps; make run"
